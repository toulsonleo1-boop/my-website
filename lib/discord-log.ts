type LogOptions = {
  staff: string
  action: string
  success: boolean
  details?: Record<string, string | number | null | undefined>
}

export async function logStaffAction({ staff, action, success, details }: LogOptions): Promise<void> {
  const webhookUrl = process.env.DISCORD_LOG_WEBHOOK_URL
  if (!webhookUrl) return

  const fields = Object.entries(details ?? {})
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .map(([name, value]) => ({
      name,
      value: String(value),
      inline: true,
    }))

  const embed = {
    title: `${success ? "✅" : "❌"} ${action}`,
    color: success ? 0x22c55e : 0xef4444,
    fields: [{ name: "Staff", value: staff || "Unknown", inline: false }, ...fields],
    timestamp: new Date().toISOString(),
    footer: { text: "SIEZE Staff Tools" },
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    })
  } catch {
    // Logging is best-effort; never block the staff action on a failed log.
  }
}
