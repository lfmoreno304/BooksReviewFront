import {
  Text,
  Card,
  Col,
  Spacer,
  Grid,
  Navbar,
  Button,
  Link,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../contexts/userContext";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const { user, credentials, logOut } = useUser();
  const [books, setBooks] = useState([]);

  const handlerBooks = async () => {
    const respose = await axios.get(
      `${process.env.NEXT_PUBLIC_LOGIN_API}/Book`
    );
    setBooks(respose.data);
  };
  useEffect(() => {
    handlerBooks();
    credentials();
  }, []);
  const handleBookClick = (id) => {
    router.push(`/book/${id}`);
  };
  const handleLogOut = () => {
    logOut();
  }
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
                <Button onPress={handleLogOut}>
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
      <Spacer y={1.6} />
      <Grid.Container justify="center">
        <Grid xs={12} sm={4}>
          {books.length > 0
            ? books.map((item, index) => (
                <Card
                  key={item.book_id}
                  css={{ w: "100%", margin: 5 }}
                  isPressable
                  onPress={() => handleBookClick(item.book_id)}
                >
                  <Card.Header
                    css={{ position: "absolute", zIndex: 1, top: 5 }}
                  >
                    <Col>
                      <Text
                        size={12}
                        weight="bold"
                        transform="uppercase"
                        color="#ffffffAA"
                      >
                        {item.author}
                      </Text>
                      <Text h4 color="white">
                        {item.title}
                      </Text>
                    </Col>
                  </Card.Header>
                  <Card.Image
                    src={item.img}
                    width="100%"
                    height={340}
                    objectFit="cover"
                    alt="Card image background"
                  />
                </Card>
              ))
            : ""}
        </Grid>
      </Grid.Container>
    </>
  );
}
