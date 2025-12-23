import { Html, Head, Body, Container, Section } from "@react-email/components"
import { FormData } from "@/types"
import { EmailHeader } from "./email/EmailHeader"
import { EmailField } from "./email/EmailField"
import { EmailFooter } from "./email/EmailFooter"
import { emailStyles } from "./email/styles"

export function ContactEmailTemplate({ name, email, phone, subject, message, preferredContact }: FormData) {
  return (
    <Html>
      <Head />
      <Body style={emailStyles.body}>
        <Container style={emailStyles.container}>
          <EmailHeader title="New Contact Form Submission" />

          <Section style={emailStyles.content}>
            <EmailField label="From:" value={name} />

            <EmailField label="Email:" value={email} href={`mailto:${email}`} />

            {phone && <EmailField label="Phone:" value={phone} href={`tel:${phone}`} />}

            <EmailField label="Subject:" value={subject} />

            <EmailField label="Preferred Contact Method:" value={preferredContact} />

            <EmailField label="Message:" value={message} isMessage={true} />

            <EmailFooter />
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
