export enum AdminStatus {
  Active = "active",
  Inactive = "inactive",
}

export type Admin = {
  id: number;
  name?: string; //use to prevent error in admin login form
  email: string;
  password: string;
  phoneNo?: string;
  role?: string;
  status?: AdminStatus; // Use the enum here
  createdAt?: Date;
  updatedAt?: Date;
};

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

  likes: PostLike[];
  comments: Comment[];
  bookmarks: BookMark[];
  author: Author;
  topic: Topic;
  category: Category;
};

export type Author = {
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
  createdAt: Date;

  posts: Post[]; //Author can write many posts
  comments: Comment[]; //Author can write many comments
  postLikes: PostLike[]; //Post Likes given by this Author //join table
  commentLikes: CommentLike[];
  followedTopics: TopicFollow[]; //join table
  followedCategories: CategoryFollow[]; //join table

  //follows relation(many-many relationship join table)
  followers: AuthorFollow[];
  following: AuthorFollow[];

  bookmarks: BookMark[]; //Author can save many posts
};

//join table between Author and Author
export type AuthorFollow = {
  id: number;
  createdAt: Date;

  // Foreign keys (optional if you always fetch full Author)
  followerId: number;
  followingId: number;

  follower: Author; //follower follows following
  following: Author;
};

export type Category = {
  id: number;
  name: string;
  slug?: string;
  createdAt?: Date; //use ? to prevent error in create form
  updatedAt?: Date;

  posts?: Post[];
  topics?: Topic[];
  followedBy?: CategoryFollow[]; //join table
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
  Author: Author;
  createdAt: Date;
  commentLikes: CommentLike[];

  //for reply under comment
  //self referencing relationship one to many
  parentId?: number | null; // optional, null if it's a top-level comment
  parent?: Comment | null; // reference to parent comment
  children: Comment[]; // replies under this comment
};

//join table
//m-m rs between Author and post
export type PostLike = {
  id: number;
  Author: Author;
  post: Post;
};

//m-m relationship between Author and post
//explicit join table
export type BookMark = {
  id: number;
  createdAt: Date;
  Author: Author;
  post: Post;
};

//join table between Author and comment
export type CommentLike = {
  id: number;
  Author: Author;
  comment: Comment;
};

//join table between Topic and Author(m-m rs)
export type TopicFollow = {
  id: number;
  Author: Author;
  topic: Topic;
  createdAt: Date;
};

//join table between Category and Author(m-m rs)
export type CategoryFollow = {
  id: number;
  Author: Author;
  category: Category;
  followedAt: Date;
};
