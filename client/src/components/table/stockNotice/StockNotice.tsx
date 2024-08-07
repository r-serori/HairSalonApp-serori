import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BasicAlerts from "../../elements/alert/BasicAlert";
import Button from "@mui/material/Button";

interface StockNoticeProps {
  nodes: any;
  setSearch: (value: string) => void;
}

const StockNotice: React.FC<StockNoticeProps> = ({ nodes, setSearch }) => {
  const stockNotice: any =
    nodes?.filter((node: any) => node?.quantity <= node?.notice) || [];
  return (
    <div>
      {stockNotice.length === 0 ? (
        <BasicAlerts
          type="info"
          message="在庫は問題ありません！"
          space={1}
          padding={1}
          size="1.2rem"
        />
      ) : (
        <div>
          <BasicAlerts
            type="warning"
            message="在庫数量が少なくなっています！"
            space={1}
            padding={0.2}
          />
          <TableContainer component={Paper} sx={{ width: 300 }}>
            <Table sx={{ width: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ padding: 0.6 }}>在庫名</TableCell>
                  <TableCell align="right" sx={{ padding: 0.6 }}>
                    在庫数量
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stockNotice.map((node: any) => (
                  <TableRow
                    key={node?.id || 0}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <Button
                      component="th"
                      scope="node"
                      sx={{
                        padding: 0.6,
                        cursor: "pointer",
                        ":hover": { color: "blue" },
                      }}
                      onClick={() => setSearch(node?.product_name || "")}
                    >
                      {node?.product_name || ""}
                    </Button>
                    <TableCell
                      align="right"
                      sx={{ padding: 0.6, color: "red" }}
                    >
                      {node?.quantity || 0}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default StockNotice;
