import { useRef } from "react";
import { View, Text, useWindowDimensions } from "react-native";

// https://www.npmjs.com/package/react-native-reanimated-carousel
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

import { Movie } from "@/infrastructure/interfaces/movie.interface";
import MoviePoster from "./MoviePoster";

interface Props {
  movies: Movie[];
}

const MainSlideshow = ({ movies }: Props) => {
  const ref = useRef<ICarouselInstance>(null);
  const width = useWindowDimensions().width; // cuando el dipositivo cambie el ancho de la pantalla el with se cambia dinamicamente (puede ser un dispositivo plegable o que cambio la orientación de la pantalla)

  return (
    <View className="h-[250px] w-full">
      <Carousel
        ref={ref}
        data={movies}
        renderItem={({ item }) => (
          <MoviePoster id={item.id} poster={item.poster} />
        )}
        width={200}
        height={350}
        style={{
          width: width,
          height: 350,
          justifyContent: "center",
          alignItems: "center",
        }}
        // efecto y configuraciones
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 60,
        }}
        defaultIndex={1}
      />
    </View>
  );
};
export default MainSlideshow;
