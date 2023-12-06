import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Typography,
} from "@mui/material";
import Link from "next/link";

export const ProductCard = ({
  product: { _id, image, name, price, rating, tags },
}) => {
  return (
    <Link href={`/${_id}`}>
      <Card className="h-[400px]">
        <CardMedia image={image} className="h-60" />

        <CardContent className="flex flex-col gap-2">
          <Typography variant="subtitle1">{name}</Typography>

          <Box className="flex flex-row gap-2">
            {tags.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </Box>

          <Box className="flex flex-row gap-2 items-end">
            <Rating value={rating} readOnly precision={0.1} />
            <Typography variant="caption">{price}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};
