import type { NextPage } from "next";
import Head from "next/head";
import FrontHero from "../components/FrontHero";
import Partners from "../components/Partners";
import ProjectsCollection from "../components/ProjectsCollection";
import FAQ from "../components/FAQ";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Greengo</title>
        <meta name="Greengo" content="Generated by create-t3-app" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <main className="min-h-screen scrollbar scrollbar-track-gray-400 
        scrollbar-thumb-green-400" >
        <div className="max-w-sm md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto">
          <section>
            <FrontHero />
          </section>
          <section>
            <Partners />
          </section>
          <section>
            <div className="mt-12">
              <div className="text-center">
                <h1 className="text-5xl font-bold font-montserrat">Featured Projects</h1>
                <p className="font-montserrat text-lg mt-5">Check out these popular projects</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 
                              max-w-lg md:max-w-3xl xl:max-w-7xl mx-auto mt-10 
                              gap-6 xl:gap-8">
                {/* <ProjectsCollection /> */}
              </div>
            </div>
          </section>
          <section className="mb-10" id="FAQ">
            <FAQ />
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;