import {
  Col,
  Row,
  Avatar,
  Text,
  Table,
  Image,
  Input,
  Spacer,
} from "@nextui-org/react";
import { Coin } from "model/coin.model";
import { useAsyncList, useCollator } from "@nextui-org/react";
import http from "@utils/http-client.utils";
import {
  AsyncListLoadOptions,
  AsyncListLoadFunction,
} from "@react-stately/data/dist/types";
import { Link } from "@nextui-org/react";
import TableSkeleton from "@component/table-skeleton";
type CoinsListProps = {
  coins: Coin[];
};
interface CustomLoads<T, C> {
  load: AsyncListLoadFunction<T, C>;
}
function CoinsList(props: CoinsListProps) {
  const columns = [
    { name: "Coin logo", uid: "iconUrl", sort: false },
    { name: "Coin name/Coin symbol", uid: "name", sort: false },
    { name: "Current price", uid: "price", sort: true },
    { name: "Market cap", uid: "marketCap", sort: true },
    { name: "The price changes", uid: "change", sort: true },
  ];
  const renderCell = (coin: Coin, columnKey: any) => {
    switch (columnKey) {
      case "iconUrl": {
        return <Avatar squared src={coin.iconUrl} />;
      }
      case "name": {
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
      }
      case "price": {
        return (
          <Text b size={14} css={{ tt: "capitalize" }}>
            {coin.price}
          </Text>
        );
      }
      case "change": {
        return (
          <Text b size={14} css={{ tt: "capitalize" }}>
            {coin.change}
          </Text>
        );
      }
      default: {
        return (
          <Text b size={14} css={{ tt: "capitalize" }}>
            {coin.marketCap}
          </Text>
        );
      }
    }
  };
  const handelOnChange = (e: any) => {
    console.log({ e: e.target.value });
  };
  const collator = useCollator({ numeric: true });
  async function load({ signal }: AsyncListLoadOptions<Coin, string>) {
    const { data } = await http.get("/coins", { signal });
    return {
      items: data.data.coins as Coin[],
    };
  }
  async function sort(sortOptions: any) {
    const { items, sortDescriptor } = sortOptions;
    return {
      items: items.sort((a: any, b: any) => {
        let first = a[sortDescriptor.column];
        let second = b[sortDescriptor.column];
        let cmp = collator.compare(first, second);
        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      }),
    };
  }
  const list = useAsyncList<Coin>({ load, sort });
  return (
    <>
      {console.log("re-render")}
      <Spacer y={1} />
      <Input
        onChange={handelOnChange}
        contentRight={<Image src="/search.svg" height={30} width={30} />}
        underlined
        aria-label="Search coins name"
        placeholder="Search coins name"
        color="primary"
      />
      <Spacer y={1} />
      {list.items?.length ? (
        <Table
          lined
          striped
          sticked
          sortDescriptor={list.sortDescriptor}
          onSortChange={list.sort}
          aria-label="Table with custom cells"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
          selectionMode="none"
        >
          <Table.Header columns={columns}>
            {(column) => {
              return (
                <Table.Column
                  key={column.uid}
                  align="start"
                  allowsSorting={column.sort}
                >
                  {column.name}
                </Table.Column>
              );
            }}
          </Table.Header>
          <Table.Body items={list.items} loadingState={list.loadingState}>
            {(item) => (
              <Table.Row key={item.uuid}>
                {(columnKey) => {
                  return <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>;
                }}
              </Table.Row>
            )}
          </Table.Body>
          <Table.Pagination
            shadow
            noMargin
            align="center"
            rowsPerPage={10}
            onPageChange={(page) => console.log({ page })}
          />
        </Table>
      ) : (
        <TableSkeleton row={10} columns={columns} />
      )}
    </>
  );
}

export default CoinsList;
