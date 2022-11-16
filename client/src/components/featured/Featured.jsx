import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./featured.scss";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const value = e.target.value;
    setGenre(value);
  };
  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  return (
    <>
      <div className="featured">
        {type && (
          <div className="category">
            <span>{type === "movies" ? "Movies" : "Series"}</span>
            <select
              name="genre"
              id="genre"
              onChange={(e) => setGenre(e.target.value)}
            >
              <option>Genre</option>
              <option value="adventure">Adventure</option>
              <option value="comedy">Comedy</option>
              <option value="crime">Crime</option>
              <option value="fantasy">Fantasy</option>
              <option value="historical">Historical</option>
              <option value="horror">Horror</option>
              <option value="romance">Romance</option>
              <option value="sci-fi">Sci-fi</option>
              <option value="thriller">Thriller</option>
              <option value="western">Western</option>
              <option value="animation">Animation</option>
              <option value="drama">Drama</option>
              <option value="documentary">Documentary</option>
            </select>
          </div>
        )}
        <img src={content.img} alt="" />
        <div className="info">
          <img src={content.imgTitle} alt="" />
          <span className="desc">{content.desc}</span>
          <div className="buttons">
            <Link
            to={{ pathname: "/watch", movie: content }}
              
            >
              <button className="play">
                <PlayArrow />
                <span>Play</span>
              </button>
            </Link>

            <button className="more" onClick={handleShow}>
              <InfoOutlined />
              <span>Info</span>
            </button>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        variant="flat"
      >
        {/* <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">
        <Container>
          <span>{content.title}</span>
        </Container>
      </Modal.Title>
    </Modal.Header> */}
        <Modal.Body className="grid">
          <Container>
            <Row>
              <video
                className="video"
                autoPlay
                progress
                controls
                src={content.trailer}
              />
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col xs={12}>
                <span className="title">{content.title}</span>
              </Col>
              <Col xs={12} className="desc">
                {content.description}
              </Col>
              <span className="line"></span>
            </Row>
            <Row>
              <Col xs={12}>
                <span className="list">Limit: </span>
                <span className="content">{content.limit}+</span>
              </Col>
              <Col xs={12}>
                <span className="list">Genre: </span>
                <span className="content">{content.genre}</span>
              </Col>
              <Col xs={12}>
                <span className="list">Release year: </span>
                <span className="content">{content.year}</span>
              </Col>
              <Col xs={12}>
                <span className="list">Duration: </span>
                <span className="content">{content.duration}</span>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
}
