const DogProfile = `${process.env.PUBLIC_URL}/avatars/dog.png`;
const BirdProfile = `${process.env.PUBLIC_URL}/avatars/bird.png`;

export const UserPlaceholder = {
    firstName: '',
    lastName: '',
    profilePicture: { location: '', key: '' },
    socialPicture: '',
    username: '',
    email: '',
    userType: 'Student',
    posts: [],
    classrooms: [],
    assignments: [],
    coins: 300,
    xp: 0,
    level: 0,
    ownedAvatars: [
        {
            name: 'dog',
            picture: DogProfile,
            price: 50
        },
        {
            name: 'bird',
            picture: BirdProfile,
            price: 70
        }
    ],
    avatar: {
        name: 'dog',
        picture: DogProfile,
        price: 50
    },
    items: [],
    loginType: '',
    admin: false,
    _id: ''
};
