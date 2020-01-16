import * as React from "react";
import { Col } from "react-bootstrap";
import { PulseLoader } from "react-spinners";

interface CardsProps {
  data: any;
  onPress: Function;
  loading: boolean;
  columns: any;
}

interface CardsState {
  loading: boolean;
}

class Cards extends React.Component<CardsProps, CardsState> {
  constructor(props: CardsProps) {
    super(props);
    this.state = { loading: this.props.loading };
  }

  componentDidUpdate() {
    if (this.state.loading !== this.props.loading) {
      this.setState({ loading: this.props.loading });
    }
  }

  cardStyle = {
    borderWidth: 2,
    borderColor: "rgb(85, 184, 141)",
    borderStyle: "solid",
    borderRadius: "5px",
    background: "#ffffff",
    cursor: "pointer",
    height: "100%",
    overflow: "scroll"
  };

  contentStyle = {
    padding: "10px"
  };

  clicked = (d: any) => {
    this.props.onPress(d);
  };

  render() {
    const listItems = this.props.data.map(d => {
      return (
        <Col
          key={d.nctId}
          lg={3}
          md={4}
          sm={6}
          xs={12}
          style={{ padding: "10px", height: "500px" }}
          onClick={() => this.clicked(d)}
        >
          <div style={this.cardStyle}>
            {this.props.columns.map((c, index) => {
              console.log(c, d);
              if (index === 0) {
                if (c.Cell) {
                  const props = {
                    original: {
                      averageRating: d.averageRating,
                      reviewsCount: d.reviewsCount
                    }
                  };

                  return (
                    <div
                      key={`${d.nctId}_${c.accessor}`}
                      style={{
                        width: "100%",
                        backgroundColor: "#55b88d80",
                        ...this.contentStyle
                      }}
                    >
                      <div style={{ width: "100%" }}>
                        <label style={{ marginBottom: "0px" }}>
                          {c.Header.props.field}
                        </label>
                      </div>
                      <div style={{ width: "100%" }}>{c.Cell(props)}</div>
                    </div>
                  );
                }

                return (
                  <div
                    key={`${d.nctId}_${c.accessor}`}
                    style={{
                      width: "100%",
                      backgroundColor: "#55b88d80",
                      ...this.contentStyle
                    }}
                  >
                    <div style={{ width: "100%" }}>
                      <label style={{ marginBottom: "0px" }}>
                        {c.Header.props.field}
                      </label>
                    </div>
                    <div style={{ width: "100%" }}>
                      <label style={{ fontSize: "20px", marginBottom: "0px" }}>
                        {d[c.accessor]}
                      </label>
                    </div>
                  </div>
                );
              }

              if (c.Cell) {
                const props = {
                  original: {
                    averageRating: d.averageRating,
                    reviewsCount: d.reviewsCount
                  }
                };

                return (
                  <div
                    key={`${d.nctId}_${c.accessor}`}
                    style={{ width: "100%", ...this.contentStyle }}
                  >
                    <div style={{ width: "100%" }}>
                      <label>{c.Header.props.field}</label>
                    </div>
                    <div style={{ width: "100%" }}>{c.Cell(props)}</div>
                  </div>
                );
              }

              return (
                <div
                  key={`${d.nctId}_${c.accessor}`}
                  style={{ width: "100%", ...this.contentStyle }}
                >
                  <div style={{ width: "100%" }}>
                    <label>{c.Header.props.field}</label>
                  </div>
                  <div style={{ width: "100%" }}>{d[c.accessor]}</div>
                </div>
              );
            })}
          </div>
        </Col>
      );
    });

    return (
      <div>
        <div style={{ width: "100%" }}>{listItems}</div>
        <PulseLoader size={15} color={"#aed7ca"} loading={this.state.loading} />
      </div>
    );
  }
}

export default Cards;
