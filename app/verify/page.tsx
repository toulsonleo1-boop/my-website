import Link from "next/link"
import { ArrowLeft, AlertCircle, CheckCircle2, Mail, User, Hash, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = await searchParams
  const get = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : "")

  const error = get("error")
  const id = get("id")
  const username = get("username")
  const globalName = get("globalName")
  const email = get("email")
  const verified = get("verified") === "1"

  const hasResult = Boolean(id)

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Link>

        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Verify with Discord
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Sign in with Discord to confirm your identity. You&apos;ll be asked to grant access to your account&apos;s
              email address.
            </p>
          </div>

          {error && (
            <div className="mt-6 flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {hasResult ? (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-center gap-2 rounded-md border border-green-500/40 bg-green-500/10 px-3 py-2 text-sm font-medium text-green-600">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Successfully verified
              </div>

              <dl className="space-y-3 rounded-xl border border-border bg-background/40 p-5">
                <Row icon={<User className="h-4 w-4" />} label="Username" value={username} />
                {globalName && (
                  <Row icon={<User className="h-4 w-4" />} label="Display name" value={globalName} />
                )}
                <Row icon={<Mail className="h-4 w-4" />} label="Email" value={email || "Not shared"} />
                <Row
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  label="Email verified"
                  value={verified ? "Yes" : "No"}
                />
                <Row icon={<Hash className="h-4 w-4" />} label="User ID" value={id} mono />
              </dl>

              <Button asChild variant="outline" className="w-full bg-transparent">
                <a href="/api/discord/oauth/start">Verify a different account</a>
              </Button>
            </div>
          ) : (
            <Button asChild className="mt-6 w-full bg-[#5865F2] font-semibold text-white hover:bg-[#4752c4]">
              <a href="/api/discord/oauth/start">Sign in with Discord</a>
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}

function Row({
  icon,
  label,
  value,
  mono,
}: {
  icon: React.ReactNode
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </dt>
      <dd className={`text-sm font-medium text-foreground ${mono ? "font-mono" : ""} break-all text-right`}>
        {value}
      </dd>
    </div>
  )
}
