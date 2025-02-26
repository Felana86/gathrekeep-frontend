export interface User {
  id: string;
  email: string;
  fullName: string | null;
  role: 'HABITANT' | 'ADMIN';
  createdAt: string;
}

export interface Association {
  id: string;
  name: string;
  city: string;
  category: string;
  createdAt: string;
  adminId: string;
}

export interface Membership {
  id: string;
  userId: string;
  associationId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface Post {
  id: string;
  content: string;
  authorId: string;
  associationId: string;
  createdAt: string;
  images: string[] | null;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: string;
}

export interface Poll {
  id: string;
  question: string;
  associationId: string;
  createdAt: string;
  expiresAt: string;
  createdBy: string;
  options: PollOption[];
}

export interface PollOption {
  id: string;
  pollId: string;
  optionText: string;
}

export interface Vote {
  id: string;
  pollId: string;
  userId: string;
  optionId: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  maxParticipants: number;
  associationId: string;
  createdBy: string;
  createdAt: string;
}

export interface EventParticipant {
  id: string;
  eventId: string;
  userId: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  readAt: string | null;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
}