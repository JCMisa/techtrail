'use client'

import { useUser } from "@clerk/nextjs";
import Header from "./_components/Header";
import { useEffect } from "react";
import { db } from "@/utils/db";
import { Player } from "@/utils/schema";
import { eq } from "drizzle-orm";
import moment from "moment";
import { toast } from "sonner";

export default function Home() {
  const { user } = useUser();

  useEffect(() => {
    user && addPlayer();
  }, [user])

  const addPlayer = async () => {
    try {
      const existingPlayer = await db.select()
        .from(Player)
        .where(eq(Player?.email, user?.primaryEmailAddress?.emailAddress));

      if (existingPlayer.length > 0) {
        toast(
          <p className='text-yellow-500 text-sm font-bold'>Player already exists!</p>
        )
        return;
      } else {
        const result = await db.insert(Player).values({
          email: user?.primaryEmailAddress?.emailAddress,
          name: user?.fullName,
          image: user?.imageUrl,
          createdAt: moment().format('MM-DD-yyyy'),
          points: 0,
          username: user?.firstName
        })
        if (result) {
          toast(
            <p className='text-green-500 text-sm font-bold'>Player added successfully!</p>
          )
        }
      }
    } catch (error) {
      toast(
        <p className='text-red-500 text-sm font-bold'>Internal error occured while saving the player</p>
      )
    }
  }

  return (
    <div>
      <Header />
    </div>
  );
}
