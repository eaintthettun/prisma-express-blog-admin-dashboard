export type Post = {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  content: string;
  readTime: string;
  featured: boolean;
  viewCount: number;
  createdAt: Date;

  comments: Comment[];
  likes: PostLike[];
  bookmarks: BookMark[];
  User: User;
  topic: Topic;
  category: Category;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  profilePictureUrl: string;
  email: string;
  password: string;
  city: string;
  country: string;
  jobPosition: string;
  company: string;
  bio: string;
  githubUrl: string;
  twitterUrl: string;
  linkedinUrl: string;

  posts: Post[]; //user can write many posts
  comments: Comment[]; //user can write many comments
  postLikes: PostLike[]; //Post Likes given by this user //join table
  commentLikes: CommentLike[];
  followedTopics: TopicFollow[]; //join table
  followedCategories: CategoryFollow[]; //join table

  //follows relation(many-many relationship join table)
  followers: UserFollow[];
  following: UserFollow[];

  bookmarks: BookMark[]; //user can save many posts
};

//join table between user and user
export type UserFollow = {
  id: number;
  createdAt: Date;

  // Foreign keys (optional if you always fetch full User)
  followerId: number;
  followingId: number;

  follower: User; //follower follows following
  following: User;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;

  posts: Post[];
  topics: Topic[];
  followedBy: CategoryFollow[]; //join table
};

export type Topic = {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;

  category: Category;
  posts: Post[];
  followedBy: TopicFollow[]; //join table
};

export type Comment = {
  id: number;
  content: string;
  post: Post;
  User: User;
  createdAt: Date;
  commentLikes: CommentLike[];

  //for reply under comment
  //self referencing relationship one to many
  parentId?: number | null; // optional, null if it's a top-level comment
  parent?: Comment | null; // reference to parent comment
  children: Comment[]; // replies under this comment
};

//join table
//m-m rs between User and post
export type PostLike = {
  id: number;
  User: User;
  post: Post;
};

//m-m relationship between user and post
//explicit join table
export type BookMark = {
  id: number;
  createdAt: Date;
  User: User;
  post: Post;
};

//join table between User and comment
export type CommentLike = {
  id: number;
  User: User;
  comment: Comment;
};

//join table between Topic and User(m-m rs)
export type TopicFollow = {
  id: number;
  User: User;
  topic: Topic;
  createdAt: Date;
};

//join table between Category and User(m-m rs)
export type CategoryFollow = {
  id: number;
  User: User;
  category: Category;
  followedAt: Date;
};
