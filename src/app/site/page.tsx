import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingCards } from "@/lib/constants";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <section className="h-full w-full flex pt-36 relative items-center justify-center flex-col">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />
        <p className="text-center">Run your agency, in one place</p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-9xl font-bold text-center md:text-[300px] ">
            Site Engine
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-70px]">
          <Image
            src={"/assets/preview.png"}
            alt="Banner-img"
            height={1200}
            width={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
        <h2 className="text-4xl text-center">Choose what fits you best</h2>
        <p className="text-muted-foreground text-center">
          Our straightforward pricing plans are tailored to meet your needs, If{" "}
          {" you're"} not <br />
          ready to commit you can get started for free.
        </p>
        <div className="flex justify-center  gap-4 flex-wrap mt-6">
          {pricingCards.map((el) => (
            <Card
              key={el.title}
              className={clsx("w-[300px] flex flex-col justify-between", {
                "border-2 border-primary": el.title === "Unlimited Saas",
              })}
            >
              <CardHeader>
                <CardTitle
                  className={clsx("", {
                    "text-muted-foreground": el.title !== "Unlimited Saas",
                  })}
                >
                  {el.title}
                </CardTitle>
                <CardDescription>{el.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">{el.price}</span>
                <span className="text-muted-foreground">/m</span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div className="">
                  {el.features.map((ft) => (
                    <div key={ft} className="flex gap-2 items-center">
                      <Check className="text-muted-foreground" />
                      <p>{ft}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/agency?plan=${el.priceId}`}
                  className={clsx(
                    "w-full text-center bg-primary p-2 rounded-md",
                    { "!bg-muted-foreground": el.title !== "Unlimited Saas" },
                  )}
                >
                  Get Started
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
