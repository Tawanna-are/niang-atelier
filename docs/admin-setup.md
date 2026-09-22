# NiangAtelier 后台启用

访问 `/admin`。本版支持新增作品、主图和多张详情图上传，不包含编辑或删除作品。
使用现有 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY`，无需管理密钥或新依赖。

## 首次配置

1. 在 Supabase **Authentication → Users → Add user → Create new user** 创建自己的邮箱密码账号，确认邮箱已验证。不要将密码写入代码或发送到聊天。
2. 复制该账号的 User UID，在 SQL Editor 执行下面的语句，将占位文本替换为真实 UID。只给工作室管理员赋权。

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where id = '替换为管理员的 UUID'::uuid;
```

3. 在 SQL Editor 执行 `supabase/admin-policies.sql`。此文件尚未自动执行。策略使用可信 `app_metadata`，不使用用户可自行修改的 `user_metadata`。它仅授予所需新增和上传/上传失败清理权限，保留原有公开读取策略。它不会审核或撤销项目中其他 UPDATE/DELETE 策略。
4. 确认 `works-images` bucket 为 Public，允许 JPG / PNG / WEBP，文件上限至少为 10 MB。Storage Public 仅代表图片可以公开读取，不代表可以公开上传。
5. 若在设置权限前已登录，请退出后重新登录，使权限进入新的 JWT。

## 使用与验证

- 登录 `/admin`，填写名称与其他可选字段，选择一张主图和最多 12 张详情图。
- 文件按原始内容上传至 `works-images/<管理员UID>/<作品UUID>/<随机UUID>.<扩展名>`，不会覆盖同名照片。
- 点击保存后，`detail_images` 直接以字符串数组传给 Supabase；不传详情图时为 `[]`。无需手动填写 JSON。
- 保存成功后点击“查看作品”，核对主图、故事和详情图；数据层不会改变主页。
- 若上传阶段失败，会尝试清理该批次已上传文件。若数据库写入结果未确认，页面会保留填写内容并提示作品 UUID 和文件目录；先检查数据库再重试，避免网络超时后重复新增。不会在写入结果未知时删除作品可能已引用的图片。
- 退出后不显示表单；非管理员账号没有后台写入入口，数据库权限由 RLS 最终强制执行。

前端代码不能代替 Supabase RLS。真实上传/写入验收需要完成上述配置并使用管理员账号；类型检查与构建通过不代表远程权限已经配置。
