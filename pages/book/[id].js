import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { useUser } from "../../contexts/userContext";
import {
  Col,
  Container,
  Row,
  Text,
  Image,
  Spacer,
  Textarea,
  Dropdown,
  Button,
  Navbar,
  Link,
} from "@nextui-org/react";
import axios from "axios";
export default function BookDetail() {
  const router = useRouter();
  const { user, credentials, logOut, jwtToken } = useUser();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selected, setSelected] = useState(new Set([1]));
  const [review, setReview] = useState({
    description: "",
    rating: "",
    book_id: 1,
    user_id: 1,
  });
  const { id } = router.query;
  const bookId = 1;
  const handleLogOut = () => {
    logOut();
  };
  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const handlerBook = async (id) => {
    const respose = await axios.get(
      `${process.env.NEXT_PUBLIC_LOGIN_API}/Book/id?id=${id}`
    );
    setBook(respose.data);
  };
  const handleReview = async (id) => {
    const respose = await axios.get(
      `${process.env.NEXT_PUBLIC_LOGIN_API}/Review/book_id?id=${id}`
    );
    setReviews(respose.data.reverse());
  };
  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };
  const handelSubmit = async () => {
    setReview({
      ...review,
      rating: selectedValue,
      book_id: id,
      user_id: user.id,
    });
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };
    console.log("REVIEW:  " + review);
    const respose = await axios.post(
      `${process.env.NEXT_PUBLIC_LOGIN_API}/Review`,
      review, {headers}
    );
    console.log(respose);
    router.push("/");
  };
  useEffect(() => {
    handlerBook(id);
    handleReview(id);
    credentials();
  }, [bookId]);
  if (book == null) {
    return <div>Cargando.....</div>;
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
                <Button onPress={handleLogOut}>Cerrar sesion</Button>
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
      <Container responsive={true}>
        <Spacer y={1.6} />
        <Row>
          <Col>
            <Text h1>{book.title}</Text>
            <Text h2>{book.author}</Text>
            <Text h3>{book.category}</Text>
          </Col>
          <Col>
            <Image
              src={book.img}
              objectFit="fill"
              autoResize={true}
              height={200}
            />
          </Col>
        </Row>
        <Spacer y={1.6} />
        <Row>
          <Col>
            <Text size="$xl">{book.summary}</Text>
          </Col>
        </Row>
      </Container>
      <Spacer y={1.6} />
      <Container responsive={true} gap={1}>
        <Text h4>Reseñas</Text>
        <Container responsive={true}>
          <Row gap={1} align="center">
            <Col>
              <Textarea
                name="description"
                onChange={handleChange}
                disabled={user == null ? true : false}
                fullWidth={true}
                label="Escribe tus pensamientos"
                placeholder="Deja tu reseña"
              />
            </Col>
            <Col span={3}>
              <Dropdown>
                <Dropdown.Button
                  name="rating"
                  disabled={user == null ? true : false}
                  onChange={handleChange}
                  flat
                  color="secondary"
                  css={{ tt: "capitalize" }}
                >
                  {" "}
                  {selectedValue}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="secondary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selected}
                  onSelectionChange={setSelected}
                >
                  <Dropdown.Item key="1">1</Dropdown.Item>
                  <Dropdown.Item key="2">2</Dropdown.Item>
                  <Dropdown.Item key="3">3</Dropdown.Item>
                  <Dropdown.Item key="4">4 </Dropdown.Item>
                  <Dropdown.Item key="5">5</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col span={5}>
              <Button
                disabled={user == null ? true : false}
                onPress={handelSubmit}
              >
                Dejar reseña
              </Button>
            </Col>
          </Row>
        </Container>
        <Spacer y={1.6} />
        {reviews.length > 0
          ? reviews.map((item, index) => (
              <>
                <Row id={index} fluid align="center">
                  <Textarea
                    fullWidth={true}
                    readOnly
                    label={item.user_email + " " + item.rating + "/5"}
                    initialValue={item.description}
                  />
                </Row>
                <Spacer id={index} y={1.6} />
              </>
            ))
          : ""}
      </Container>
    </>
  );
}
