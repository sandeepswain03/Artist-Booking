import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface ContactUsEmailProps {
  userEmail: string;
  subject: string;
  message: string;
}

export default function ContactUsEmail({
  userEmail,
  subject,
  message,
}: ContactUsEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Contact Us Form Submission</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>New Contact Form Submission</Preview>
      <Section>
        <Row>
          <Heading as="h2">New Contact Form Submission</Heading>
        </Row>
        <Row>
          <Text>
            <strong>From:</strong> {userEmail}
          </Text>
        </Row>
        <Row>
          <Text>
            <strong>Subject:</strong> {subject}
          </Text>
        </Row>
        <Row>
          <Text>
            <strong>Message:</strong>
          </Text>
        </Row>
        <Row>
          <Text>{message}</Text>
        </Row>
      </Section>
    </Html>
  );
}