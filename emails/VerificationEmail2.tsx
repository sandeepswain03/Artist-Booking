import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail2({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Event Duniya - Email Verification</title>
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
      <Preview>Your Event Duniya Email Verification Code: {otp}</Preview>
      <Section style={{ backgroundColor: "#f6f6f6", padding: "20px" }}>
        <Row>
          <Heading as="h1" style={{ color: "#333333", textAlign: "center" }}>
            Event Duniya
          </Heading>
        </Row>
        <Row>
          <Heading as="h2" style={{ color: "#444444" }}>
            Hello {username},
          </Heading>
        </Row>
        <Row>
          <Text style={{ fontSize: "16px", color: "#555555" }}>
            Thank you for signing up with Event Duniya. To complete your
            registration and verify your email address, please use the following
            verification code:
          </Text>
        </Row>
        <Row>
          <Text
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#007bff",
              textAlign: "center",
              padding: "10px",
              backgroundColor: "#e9f5ff",
              borderRadius: "5px",
            }}
          >
            {otp}
          </Text>
        </Row>
        <Row>
          <Text style={{ fontSize: "16px", color: "#555555" }}>
            This code will expire in 10 minutes. If you did not request this
            verification, please ignore this email.
          </Text>
        </Row>
        <Row>
          <Text
            style={{ fontSize: "14px", color: "#777777", marginTop: "20px" }}
          >
            If you have any questions or need assistance, please don't hesitate
            to contact our support team.
          </Text>
        </Row>
        <Row>
          <Text
            style={{
              fontSize: "14px",
              color: "#777777",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            © 2023 Event Duniya. All rights reserved.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
