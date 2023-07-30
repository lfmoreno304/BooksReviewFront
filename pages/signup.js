import {
  Text,
  Card,
  Row,
  Input,
  Button,
  Grid,
  Spacer,
  Navbar,
  Link,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../contexts/userContext";
import axios from "axios";
export default function signup() {
  const router = useRouter();
  const { user, credentials } = useUser();
  const [credential, setCredentials] = useState({
    email: "",
    Password: "",
    img: "",
  });
  useEffect(() => {
    credentials();
  }, []);
  const handleChange = (e) => {
    setCredentials({
      ...credential,
      [e.target.name]: e.target.value,
    });
  };
  const handelSubmit = async () => {
    const respose = await axios.post(
      `${process.env.NEXT_PUBLIC_LOGIN_API}/User`,
      credential
    );
    console.log(respose);
    router.push("/login");
  };
  return (
    <>
      <Navbar isCompact isBordered variant="sticky">
        <Navbar.Brand>
          <Link href="/">
            <Text b color="inherit" hideIn="xs">
              Books Review
            </Text>
          </Link>
        </Navbar.Brand>
        <Navbar.Content>
          {user != null ? (
            <>
              <Text>{user.email}</Text>
              <Navbar.Item>
                <Button auto flat as={Link} href="/">
                  Cerrar sesion
                </Button>
              </Navbar.Item>
            </>
          ) : (
            <>
              <Navbar.Link color="inherit" href="/login">
                Iniciar Sesion
              </Navbar.Link>
              <Navbar.Item>
                <Button auto flat as={Link} href="/signup">
                  Registrarse
                </Button>
              </Navbar.Item>
            </>
          )}
        </Navbar.Content>
      </Navbar>
      <Grid.Container
        gap={2}
        display="flex"
        justify="center"
        alignItems="center"
        css={{ height: "100vh" }}
      >
        <Grid sm={12} md={5}>
          <Card css={{ mw: "600px" }}>
            <Card.Header>
              <Text b>Registrarse</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: "$20" }}>
              <Input
                name="email"
                bordered
                labelPlaceholder="Email"
                color="default"
                onChange={handleChange}
              />
              <Spacer y={1.6} />
              <Input.Password
                name="password"
                labelPlaceholder="Password"
                initialValue=""
                onChange={handleChange}
              />
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Row justify="flex-end">
                <Button size="sm" onPress={handelSubmit}>
                  Registrarse
                </Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  );
}
