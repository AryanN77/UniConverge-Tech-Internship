import React, { useEffect, useState } from "react";
import axios from "axios"
import { Link } from 'react-router-dom';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card.tsx"

function Home({ users }) {

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-3">
        {users.map((data) => (
          <Link to={`/user/${data.id}`} key={data.email}>
            <Card className="h-[200px]">
              <CardHeader>
                <CardTitle>{data.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{data.email}</p>
                <p>{data.company.name}</p>
              </CardContent>
              <CardFooter>
                <p>{data.phone}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Home;
