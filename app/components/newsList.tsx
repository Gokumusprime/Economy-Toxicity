"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import xml2js from "xml2js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsSection from "./newsSection";

interface Section {
  title: string;
  pubDate: string;
  link: string;
  description: string;
}

const NewsList: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSections = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/economy-news",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Content-Type": "application/xml",
          },
          responseType: "text",
        }
      );

      const parser = new xml2js.Parser();
      parser.parseString(
        response.data,
        (err: unknown, result: { rss: { channel: { item: unknown[] }[] } }) => {
          if (err) {
            setError(`Error parsing XML: ${(err as Error).message}`);
            setLoading(false);
            return;
          }

          const items = result.rss.channel[0].item as {
            title: string[];
            link: string[];
            pubDate: string[];
            description: string[];
          }[];

          const newsSections = items.map(
            (item): Section => ({
              title: item.title[0],
              link: item.link[0],
              pubDate: item.pubDate[0],
              description: item.description[0],
            })
          );

          // Only update state after data is fully processed
          setSections((prevNewsSections) => {
            // Retain previous sections if news sections are empty
            return newsSections.length > 0 ? newsSections : prevNewsSections;
          });
          setLoading(false);
        }
      );
    } catch (err: unknown) {
      setError(`Error: ${(err as Error).message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
    const interval = setInterval(fetchSections, 60000); // Fetch news sections every 60 seconds

    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 500,
    cssEase: "ease-in-out",
    waitForAnimate: true,
    arrows: false,
  };

  return (
    <div className="card mx-4 sm:mx-0 bg-base-100 shadow-sm transition-all duration-300 break-inside-avoid">
      <div className="card-body">
        <h3 className="inline-block sm:display-block mb-2 sm:mb-3 text-center sm:text-left card-title text-2xl w-full">
          The Economy in the News
        </h3>
        <div className="grid grid-cols-3 chat">
          {loading && sections.length === 0 ? (
            <div className="text-sm col-span-3">Loading...</div>
          ) : error ? (
            <div className="text-red-500 text-sm col-span-3">{error}</div>
          ) : (
            <Slider className="col-span-3" {...settings}>
              {sections.map((section, index) => (
                <NewsSection
                  key={index}
                  index={index}
                  title={section.title}
                  link={section.link}
                  pubDate={section.pubDate}
                  description={section.description}
                />
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsList;
