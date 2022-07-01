import { Table } from "@nextui-org/react";
import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type TableSkeletonProps = {
  columns?: any[];
  row?: number;
};

function TableSkeleton(props: TableSkeletonProps) {
  const { columns, row } = props;
  const rowRender = useMemo(() => {
    return Array.from(Array(row).keys()).map((idx) => {
      return { id: idx };
    });
  }, [row]);
  return (
    <Table
      lined
      striped
      aria-label="Table with skeleton"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => {
          return (
            <Table.Column key={column.uid} align="start">
              {column.name}
            </Table.Column>
          );
        }}
      </Table.Header>
      <Table.Body items={rowRender}>
        {(item) => (
          <Table.Row key={item.id}>
            {(columnKey) => {
              return (
                <Table.Cell>
                  <Skeleton />
                </Table.Cell>
              );
            }}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}

export default TableSkeleton;
