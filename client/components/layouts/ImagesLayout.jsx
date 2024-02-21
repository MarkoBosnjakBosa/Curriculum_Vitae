import { ImageListItem, ImageListItemBar, IconButton } from "@mui/material";
import { Info } from "@mui/icons-material";

const ImagesLayout = (props) => {
  const { portfolio, type } = props;

  return (
    portfolio.map((portfolioItem) => (
      <ImageListItem key={portfolioItem._id} sx={{ height: "350px !important", "& .MuiImageListItem-img": { height: "350px !important" } }}>
        <img src={portfolioItem.logo.data} alt={portfolioItem.logo.title} loading="lazy" />
        <ImageListItemBar title={portfolioItem.title} subtitle={type} actionIcon={<a href={portfolioItem.link} target="_blank"><IconButton sx={{ color: "rgba(255, 255, 255, 0.54)" }}><Info /></IconButton></a>} />
      </ImageListItem>
    ))
  );
};

export default ImagesLayout;
