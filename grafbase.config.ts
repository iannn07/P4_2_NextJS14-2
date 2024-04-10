import { config, auth, graph } from '@grafbase/sdk';

const g = graph.Standalone();

const User = g.type('User', {
  name: g.string(),
  email: g.string(),
  avatarUrl: g.url(),
  description: g.string(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(),
});

const Project = g.type('Project', {
  title: g.string(),
  description: g.string(),
  image: g.url(),
  liveSiteUrl: g.url(),
  githubUrl: g.url(),
  category: g.string(),
  createdBy: g.ref(User),
});

g.type('User', {
  projects: g.ref(Project).list().optional(),
});

const jwt = auth.JWT({
  issuer: 'grafbase',
  secret: g.env('NEXTAUTH_SECRET'),
});

export default config({
  graph: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});
