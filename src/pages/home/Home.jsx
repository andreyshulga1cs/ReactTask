import React, { useState, useEffect } from 'react';
import { CurrentWeather, Clock } from '../../components';
import { publicApiInstance, getAccessTokenFromAPI } from '../../utils/api';
import { Cookie } from '../../services/cookie';
import { translations } from '../../utils/translations';
import endpoints from '../../config/endpoints';
import * as S from './Home.styles';

const Home = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(showPosition);
  };

  const showPosition = position => {
    setLocation({ lon: position.coords.longitude, lat: position.coords.latitude });
  };

  const getWeatherData = async () => {
    if (!location) return;
    try {
      const { data } = await publicApiInstance.get(endpoints.GET_CURRENT_LOCATION(location));
      setData([data.current]);
    } catch (error) {
      console.warn(error);
    }
  };

  const tokenHandler = async () => {
    if (!Cookie.getToken()) {
      const res = await getAccessTokenFromAPI();
      return Cookie.setToken(res);
    }
  };

  useEffect(() => {
    tokenHandler();
    getLocation();
  }, []);

  useEffect(() => {
    getWeatherData();
  }, [location]);

  if (!location) {
    return <S.Message>{translations.msg_page_home_location_error}</S.Message>;
  }

  return (
    <S.Container>
      <CurrentWeather data={data} />
      <Clock />
    </S.Container>
  );
};

export default Home;
