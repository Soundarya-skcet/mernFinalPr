import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import SkeletonStory from '../Skeletons/SkeletonStory';
import CardStory from '../StoryScreens/CardStory';
import NoStories from '../StoryScreens/NoStories';
import Pagination from './Pagination';
import '../../Css/Home.css';

const Home = () => {
  const search = useLocation().search;
  const searchKey = new URLSearchParams(search).get('search');
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const getStories = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/story/getAllStories?search=${searchKey || ""}&page=${page}`);
        setStories(data.data);
        setPages(data.pages);
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    getStories();
  }, [searchKey, page]);

  useEffect(() => {
    setPage(1);
  }, [searchKey]);

  return (
    <div className="home-page">
      <div className="top-stories-today">
        {/* Top stories logic and rendering */}
      </div>
      {loading ? (
        <div className="skeleton-emp">
          {[...Array(6)].map(() => (
            <SkeletonStory key={uuidv4()} />
          ))}
        </div>
      ) : (
        <div>
          <div className="story-card-wrapper">
            {stories.length !== 0 ? (
              stories.map((story) => (
                <CardStory key={uuidv4()} story={story} />
              ))
            ) : (
              <NoStories />
            )}
            <Pagination page={page} pages={pages} changePage={setPage} />
          </div>
        </div>
      )}
      {/* Contact Section */}
      <div className="contact-section">
        <h2>Contact</h2>
        <p>Ask us anything</p>
        <div className="contact-details">
          <p>123-456-7890</p>
          <p>info@mysite.com</p>
        </div>
        <form className="contact-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Leave Us a Message..."></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
