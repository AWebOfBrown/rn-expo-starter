import React, { Component } from "react";
import {View, Text, StyleSheet} from 'react-native';
import TimeAgo from "timeago-react";

const ArticleBriefing = ({
  title,
  descendants,
  url,
  by,
  time,
  deleted,
  text,
  score,
  id
}) => {
  let urlRegexed = url
    ? url.match(/(?!w{1,}\.)(\w+\.?)([a-zA-Z]+)(\.\w+)/)
    : null;

  let regexMatch = urlRegexed ? urlRegexed[0] : null;

  return (

    <View style={styles.container}>
      <Text style={styles.title}> {title} </Text>
    </View>

    <Container>
      <Title
        href={url}
        target="_blank"
        referrer="noreferrer noopener"
        style={{ marginBottom: "40px" }}
      >
        {title}
      </Title>

      <Row style={{ opacity: 0.65, marginBottom: "40px" }}>
        <Detail>
          <Label>Rank</Label>
          <p
            style={{
              color: "white",
              opacity: 0.75,
              fontSize: "22px",
              fontWeight: 200,
              fontFamily: "Spectral"
            }}
          >
            #{rank}
          </p>
        </Detail>
        <Detail>
          <Label> Via</Label>
          <p
            style={{
              color: "white",
              opacity: 0.75,
              fontSize: "22px",
              fontWeight: 200,
              fontFamily: "Spectral"
            }}
          >
            {regexMatch}
          </p>
        </Detail>
        <Detail>
          <Label> Submitter </Label>
          <p
            style={{
              color: "white",
              opacity: 0.75,
              fontSize: "22px",
              fontWeight: 200,
              fontFamily: "Spectral"
            }}
          >
            @{by}
          </p>
        </Detail>
        <Detail>
          <Label> Submitted </Label>
          <TimeAgo
            datetime={new Date(time * 1000)}
            style={{
              color: "white",
              opacity: 0.75,
              fontSize: "22px",
              fontWeight: 200,
              fontFamily: "Spectral"
            }}
          />
        </Detail>
      </Row>
    </Container>
  );
};

export default Briefing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  min-height: 320px;
  width: 100%;
  margin: 0px auto 0px auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: 0px 20px;

  @media ${props => props.theme.mq.boundaries.widescreen.min} {
    padding: 0px;
  }
`;

const Label = styled.div`
  font-size: 16px;
  color: white;
  opacity: 0.5;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const Title = styled.a`
  color: #adbbe2;
  font-size: 36px;
  line-height: 1;
  margin-top: 10px;
  margin-bottom: 60px;
  text-transform: capitalize;
  font-family: Spectral;
  font-weight: 300;
  text-decoration: none;
  transition: color 0.5s linear;

  :hover {
    text-decoration: none;
    color: white;
  }
`;

const Row = styled.div`
  display: flex;
`;

const Detail = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-right: 25px;
`;
