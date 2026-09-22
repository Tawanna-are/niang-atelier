"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { createWork } from "@/lib/admin-works";
import { validateImages } from "@/lib/admin-work-input";
import styles from "./admin.module.css";

function Preview({ files }: { files: File[] }) {
  const [urls, setUrls] = useState<string[]>([]);
  useEffect(() => {
    const next = files.map((file) => URL.createObjectURL(file));
    setUrls(next);
    return () => next.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);
  return <div className={styles.previews}>{urls.map((url, i) => <figure key={url}><img src={url} alt={`所选图片 ${i + 1}`} /><figcaption>{files[i]?.name}</figcaption></figure>)}</div>;
}

export default function AdminWorks() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [savedId, setSavedId] = useState("");
  const [cover, setCover] = useState<File[]>([]);
  const [details, setDetails] = useState<File[]>([]);

  useEffect(() => {
    let active = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) { setUser(session?.user ?? null); setLoading(false); }
    });
    supabase.auth.getUser().then(({ data, error }) => {
      if (active) { setUser(data.user); setLoading(false); if (error && error.name !== "AuthSessionMissingError") setMessage("无法确认登录状态，请重新登录。"); }
    }).catch(() => { if (active) { setLoading(false); setMessage("无法连接登录服务，请重试。"); } });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true); setMessage("");
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: String(data.get("email")).trim(), password: String(data.get("password")) });
      if (error) throw error;
    } catch { setMessage("登录失败，请检查邮箱、密码或网络连接。"); }
    finally { setBusy(false); }
  }

  async function logout() {
    setBusy(true); setMessage(""); setSavedId("");
    try { const { error } = await supabase.auth.signOut(); if (error) throw error; setCover([]); setDetails([]); }
    catch { setMessage("退出失败，请重试。"); }
    finally { setBusy(false); }
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true); setMessage(""); setSavedId("");
    try {
      validateImages(cover[0], details);
      const id = await createWork({ name: String(data.get("name") ?? ""), name_en: String(data.get("name_en") ?? ""), materials: String(data.get("materials") ?? ""), technique: String(data.get("technique") ?? ""), story: String(data.get("story") ?? "") }, cover[0], details);
      setSavedId(id); form.reset(); setCover([]); setDetails([]);
    } catch (error) { setMessage(error instanceof Error ? error.message : "保存失败，请重试。"); }
    finally { setBusy(false); }
  }

  if (loading) return <p role="status">正在确认登录状态…</p>;

  return <>
    {message && <p className={styles.notice} role="alert">{message}</p>}
    {!user ? <form onSubmit={login} className={styles.login}>
      <h2>Studio access</h2><p>使用管理员邮箱登录。</p>
      <fieldset disabled={busy}>
        <label>邮箱<input name="email" type="email" autoComplete="username" required /></label>
        <label>密码<input name="password" type="password" autoComplete="current-password" required /></label>
        <button type="submit">{busy ? "正在登录…" : "登录 →"}</button>
      </fieldset>
    </form> : <>
      <div className={styles.session}><span>{user.email}</span><button onClick={logout} disabled={busy}>退出登录</button></div>
      {user.app_metadata.role !== "admin" ? <p className={styles.notice}>当前账号尚未配置管理员权限，请联系工作室管理员。</p> : <>
        {savedId && <p className={styles.notice} role="status">作品已保存。<Link href={`/works/${savedId}`}>查看作品 ↗</Link></p>}
        <form onSubmit={save} aria-busy={busy}>
          <fieldset disabled={busy} className={styles.form}>
            <section className={styles.section}><div><p className={styles.eyebrow}>01 / INFORMATION</p><h2>作品信息</h2></div><div className={styles.fields}>
              <label>作品名称 · Name *<input name="name" required maxLength={200} /></label>
              <label>英文名称 · English name<input name="name_en" maxLength={200} /></label>
              <div className={styles.pair}><label>制作工艺 · Technique<input name="technique" maxLength={1000} /></label><label>材料 · Materials<input name="materials" maxLength={1000} /></label></div>
              <label>作品故事 · Story<textarea name="story" rows={7} maxLength={20000} /></label>
            </div></section>
            <section className={styles.section}><div><p className={styles.eyebrow}>02 / PHOTOGRAPHS</p><h2>作品影像</h2><p>JPG、PNG 或 WEBP。<br />每张不超过 10 MB。</p></div><div className={styles.fields}>
              <label>主图 · Cover image *<input type="file" accept="image/jpeg,image/png,image/webp" required onChange={(e) => setCover(Array.from(e.target.files ?? []))} /></label><Preview files={cover} />
              <label>详情图 · Detail images<input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(e) => setDetails(Array.from(e.target.files ?? []))} /><small>可选，最多 12 张；按下方预览顺序展示。</small></label><Preview files={details} />
            </div></section>
            <div className={styles.actions}><p role="status">{busy ? "正在上传图片并保存作品，请保留此页面…" : "保存后，作品将在 Works 中公开展示。"}</p><button type="submit">{busy ? "保存中…" : "保存作品 →"}</button></div>
          </fieldset>
        </form>
      </>}
    </>}
  </>;
}
