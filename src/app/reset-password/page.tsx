"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function ResetPassword() {
  const { toast } = useToast();
  const router = useRouter();
  const [pass, setPass] = useState("");
  const save = async () => {
    if (pass.length < 6) { toast("Password needs at least 6 characters."); return; }
    const { error } = await supabaseBrowser().auth.updateUser({ password: pass });
    if (error) { toast("That link has expired. Ask for a new one from the sign in page."); return; }
    toast("Password updated. You are back in.");
    router.push("/app");
    router.refresh();
  };
  return (
    <div id="auth" style={{ gridTemplateColumns: "1fr" }}>
      <div className="auth-glow" />
      <div className="auth-right" style={{ background: "transparent" }}>
        <div className="auth-card">
          <h2>Choose a new password</h2>
          <p className="lede">Six characters or more.</p>
          <div className="field"><label htmlFor="np">New password</label>
            <input className="inp" id="np" type="password" autoComplete="new-password" value={pass} onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") void save(); }} /></div>
          <button className="btn btn-p btn-full" onClick={() => { void save(); }}>Save password</button>
        </div>
      </div>
    </div>
  );
}
