import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAftermath } from "../../contexts/AftermathContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loading from "../common/Loading";

const ChartWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.lg};
  border: 1px solid ${(props) => props.theme.colors.primary}33;
  height: 400px;
`;

const TooltipContent = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.sm};
`;

interface PriceData {
  timestamp: number;
  price: number;
}

interface PriceChartProps {
  tokenPair: string; // Format: "TOKEN1/TOKEN2"
}

const PriceChart = ({ tokenPair }: PriceChartProps) => {
  const aftermath = useAftermath();
  const [data, setData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        const [tokenIn, tokenOut] = tokenPair.split("/");
        const priceHistory = await aftermath.Price.getPriceHistory({
          coinInType: tokenIn,
          coinOutType: tokenOut,
        });

        setData(
          priceHistory.map((point) => ({
            timestamp: point.timestamp,
            price: point.price,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch price history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceHistory();
  }, [tokenPair]);

  if (loading) return <Loading />;

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(timestamp) =>
              new Date(timestamp).toLocaleTimeString()
            }
          />
          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <TooltipContent>
                    <p>Price: ${payload[0].value.toFixed(6)}</p>
                    <p>
                      Time:{" "}
                      {new Date(payload[0].payload.timestamp).toLocaleString()}
                    </p>
                  </TooltipContent>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={(props) => props.theme.colors.primary}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default PriceChart;
