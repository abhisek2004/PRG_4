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
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>CodeCompiler - OTP Verification</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Verify your CodeCompiler account with the OTP: {otp}</Preview>
      <Section style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
        <Row>
          <Heading as="h2" style={{ color: '#333' }}>
            Hello {username},
          </Heading>
        </Row>
        <Row>
          <Text style={{ fontSize: '16px', color: '#555' }}>
            Thank you for signing up for CodeCompiler. To complete your registration, please use the verification code below:
          </Text>
        </Row>
        <Row style={{ padding: '15px 0' }}>
          <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#007acc' }}>
            {otp}
          </Text>
        </Row>
        <Row>
          <Text style={{ fontSize: '14px', color: '#777' }}>
            If you did not request this code, please disregard this email.
          </Text>
        </Row>
        {/* <Row style={{ marginTop: '20px' }}>
          <Button
            href={`https://codecompiler.com/verify/${username}`}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007acc',
              color: '#fff',
              borderRadius: '5px',
              textDecoration: 'none',
              fontSize: '16px',
            }}
          >
            Verify Your Account
          </Button>
        </Row> */}
      </Section>
    </Html>
  );
}
