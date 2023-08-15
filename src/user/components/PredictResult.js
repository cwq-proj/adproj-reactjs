import React from "react";
import { useParams } from "react-router-dom";

export default function PredictResult() {
  const { data } = useParams();
  const decodedData = decodeURIComponent(data);

  return (<>
  <div>{decodedData}</div>
  </>
  );
}
