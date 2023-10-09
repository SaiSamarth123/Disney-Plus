import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from "./Viewers";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommendsRef = useRef([]);
  let newDisneysRef = useRef([]);
  let originalsRef = useRef([]);
  let trendingRef = useRef([]);

  useEffect(() => {
    console.log("hello");
    db.collection("movies").onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(recommendsRef);
        switch (doc.data().type) {
          case "recommend":
            recommendsRef.current = [
              ...recommendsRef.current,
              { id: doc.id, ...doc.data() },
            ];
            break;

          case "new":
            newDisneysRef.current = [
              ...newDisneysRef.current,
              { id: doc.id, ...doc.data() },
            ];
            break;

          case "original":
            originalsRef.current = [
              ...originalsRef.current,
              { id: doc.id, ...doc.data() },
            ];
            break;

          case "trending":
            trendingRef.current = [
              ...trendingRef.current,
              { id: doc.id, ...doc.data() },
            ];
            break;

          default:
            console.warn("Unknown movie type: ", doc.data().type);
            break;
        }
      });

      dispatch(
        setMovies({
          recommend: recommendsRef.current,
          newDisney: newDisneysRef.current,
          original: originalsRef.current,
          trending: trendingRef.current,
        })
      );
    });
  }, [userName, dispatch]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
