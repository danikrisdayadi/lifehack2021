const DogProfile = `${process.env.PUBLIC_URL}/avatars/dog.png`;
const BirdProfile = `${process.env.PUBLIC_URL}/avatars/bird.png`;
const CatProfile = `${process.env.PUBLIC_URL}/avatars/cat.png`;
const RatProfile = `${process.env.PUBLIC_URL}/avatars/rat.png`;

export const CharactersPlaceholder = [
    {
        name: 'dog',
        picture: DogProfile,
        price: 50
    },
    {
        name: 'bird',
        picture: BirdProfile,
        price: 70
    },
    {
        name: 'cat',
        picture: CatProfile,
        price: 85
    },
    {
        name: 'rat',
        picture: RatProfile,
        price: 100
    }
];
