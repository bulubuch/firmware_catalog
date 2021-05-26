
module.export = {resolvers:  {
	Query: {
	  uploads: (parent, args) => {},
	},
	Mutation: {
	  fileUpload: (parent, args) => {
		return args.file.then(file => {
		  //Contents of Upload scalar: https://github.com/jaydenseric/graphql-upload#class-graphqlupload
		  //file.createReadStream() is a readable node stream that contains the contents of the uploaded file
		  //node stream api: https://nodejs.org/api/stream.html
		  return file;
		});
	  },
	},
}};