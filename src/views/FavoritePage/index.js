import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { X } from "react-feather";
import NewFavorite from "../../components/NewFavorite";

const FavoritePage = () => {
  const [userFavorites, setUserFavorites] = useState("");

  const removeFavorite = async phone => {
    let favoritesAfterDelete = await fetch(`/api/myuser/favorites/${phone}`, {
      method: "DELETE"
    });
    let newFavorites = await favoritesAfterDelete.json();
    setUserFavorites(newFavorites);
  };
  const getAllUserFavorites = async () => {
    const allFavoritesRaw = await fetch("/api/myuser/favorites");
    const allFavorites = await allFavoritesRaw.json();
    if (allFavorites && allFavorites !== userFavorites)
      setUserFavorites(allFavorites);
  };
  useEffect(() => {
    getAllUserFavorites()
     //comment below removes varning to include or exclude idToGet
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <h2 className="page-title">Favoriter</h2>
      <Row className="no-gutters">
        {userFavorites
          ? userFavorites.map((favorite, i) => {
              return (
                <Col xs="12" className="mb-3 bg-test" key={"favorite_" + i}>
                  <Row>
                    <Col xs="7" md="10">
                      <p className="nickname">{favorite.nickname}</p>
                      <p className="phonenr">{favorite.phone}</p>
                    </Col>
                    <Col xs="5" md="2">
                      <Button
                        className="remove-btn"
                        onClick={() => removeFavorite(favorite.phone)}
                      >
                        Ta bort <X />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              );
            })
          : ""}
      </Row>

      <Row className="button-field no-gutters">
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          <NewFavorite updateFavorites={getAllUserFavorites} />
        </Col>
      </Row>
    </Container>
  );
};

export default FavoritePage;
