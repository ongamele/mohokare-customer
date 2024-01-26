import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";

export function Communication() {

  const[username, setUsername] = useState("")
  const[password, setPassword] = useState()
  return (
    <section className="m-8 flex gap-4">
      <div className="text-center">
        <Typography variant="h2" className="font-bold mb-4">Communication</Typography>
       
      </div>
      


  </section>
  );
}

export default Communication;
