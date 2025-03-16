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

interface ContactUsEmailProps {
  firstname: string;
  lastname: string;
  emailID: string;
  message: string;
}

export default function ContactUsEmail({ firstname, lastname, emailID, message }: ContactUsEmailProps) {
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
      <Preview>Someone contact you from Code-Compiler</Preview>
      <Section style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
        <Row>
          FullName: {firstname} {lastname}
        </Row>
        <Row>
          EmailID: {emailID}
        </Row>
        <Row>
          Message: {message}
        </Row>
      </Section>
    </Html>
  );
}
