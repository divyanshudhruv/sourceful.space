import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Layout, Pointer, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface Feature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const MVP = ({
  tabs = [
    {
      value: "tab-1",
      icon: <Zap className="h-auto w-4 shrink-0" />,
      label: "Boost Revenue",
      content: {
        badge: "Modern Tactics",
        title: "Make your site a true standout.",
        description:
          "Discover new web trends that help you craft sleek, highly functional sites that drive traffic and convert leads into customers.",
        buttonText: "See Plans",
        imageSrc:
          "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
        imageAlt: "placeholder",
      },
    },
    
  ],
}: Feature108Props) => {
  return (
    <section className="py-0 pb-5">
      <div className="container mx-auto">
        <Tabs defaultValue={tabs[0].value} className="mt-8">
          <div className="mx-auto mt-8 max-w-screen-xl rounded-2xl bg-[#f6f6f7] p-6 lg:p-16">
            <div className="relative">
              {tabs.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="grid place-items-start gap-20 lg:grid-cols-2 lg:gap-10"
                >
                  <div className="flex flex-col gap-5">
                    <Badge variant="outline" className="w-fit bg-[#F3F4F6]">
                      {tab.content.badge}
                    </Badge>
                    <h3 className="text-3xl font-semibold lg:text-5xl">
                      {tab.content.title}
                    </h3>
                    <p className="text-muted-foreground lg:text-lg">
                      {tab.content.description}
                    </p>
                    <Button className="mt-2.5 w-fit gap-2" size="lg">
                      {tab.content.buttonText}
                    </Button>
                  </div>
                  <div className="relative h-[300px] w-full lg:h-[400px]">
                    <img
                      src={tab.content.imageSrc}
                      alt={tab.content.imageAlt}
                      className="h-full w-full rounded-xl object-cover"
                      width={600}
                      height={400}
                    />
                  </div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { MVP };
