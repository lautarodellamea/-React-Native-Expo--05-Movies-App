// No usariamos ninguna libreria de terceros

import {
  View,
  Text,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Movie } from "@/infrastructure/interfaces/movie.interface";
import MoviePoster from "./MoviePoster";
import { useEffect, useRef } from "react";

interface Props {
  title?: string;
  movies: Movie[];
  className?: string;

  loadNextPage?: () => void;
}

const MovieHorizontalList = ({
  title,
  movies,
  className,
  loadNextPage,
}: Props) => {
  const isLoading = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      isLoading.current = false;
    }, 200);
  }, [movies]);

  // infinite scroll
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) return; // usamos sto porque es muy ruidoso el evento de scroll

    // posicion actual en el scroll, contenido de lo que estamos viendo en pantalla, contenido de qlo que tenemos
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

    const isEndReached =
      contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width; // esto es para determinar cuando se llega al final del scroll, le doy un margen de 600px igual

    if (!isEndReached) return; // no hay nada que hacer si no se llego al final del scroll

    isLoading.current = true;

    // momento exacto donde se llego al final y se pide la data
    console.log("cargar siguientes peliculas");
    loadNextPage && loadNextPage();

    isLoading.current = false;
  };

  return (
    <View className={` ${className}`}>
      {title && <Text className="text-3xl font-bold px-4 mb-2">{title}</Text>}

      <FlatList
        horizontal
        data={movies}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, i) => `${item.id}-${i}`}
        renderItem={({ item }) => (
          <MoviePoster id={item.id} poster={item.poster} smallPoster />
        )}
        // en el flatlist tenemos el evento scroll - lo usaremos para el infinite scroll
        onScroll={onScroll}
      />
    </View>
  );
};
export default MovieHorizontalList;
