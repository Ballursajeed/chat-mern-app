import mognoose from "mongoose";

const userShema = new mongoose.Schema(
{

},
{
	timestamps:true
}
);

export const User = mongoose.model("User",userSchema);

