import { Col, Row, Avatar, Text, Table } from "@nextui-org/react";
import { Coin } from "model/coin.model";

type CoinsListProps = {
  coins: Coin[];
};
function CoinsList(props: CoinsListProps) {
  const { coins } = props;
  const columns = [
    { name: "Coin logo", uid: "iconUrl" },
    { name: "Coin symbol", uid: "symbol" },
    { name: "Coin name", uid: "name" },
    { name: "Current price", uid: "price" },
    { name: "Current total market cap", uid: "tier" },
    { name: "The price changes", uid: "change" },
  ];
  const renderCell = (coin: Coin, columnKey: any) => {
    switch (columnKey) {
      case "iconUrl":
        return <Avatar squared src={coin.iconUrl} />;
      case "name":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {coin.name}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                {coin.symbol}
              </Text>
            </Row>
          </Col>
        );
      case "price":
        return (
          <Text b size={14} css={{ tt: "capitalize" }}>
            {coin.price}
          </Text>
        );
      case "change":
        return (
          <Text b size={14} css={{ tt: "capitalize" }}>
            {coin.price}
          </Text>
        );
    }
  };
  return (
    <Table
      aria-label="Example table with custom cells"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => {
          console.log(column);
          return (
            <Table.Column key={column.uid} align="center">
              {column.name}
            </Table.Column>
          );
        }}
      </Table.Header>
      <Table.Body items={coins}>
        {(item) => (
          <Table.Row key={item.uuid}>
            {(columnKey) => {
              console.log({ columnKey });
              return <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>;
            }}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}

export default CoinsList;
