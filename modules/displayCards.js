
export function displayCards(users,weatherStats){
const cards=document.getElementsByClassName("card")
for(let i=0;i<5;i++)
{
    const image=cards[i].querySelector("img");
    const name= cards[i].querySelector("h3");
    const location =cards[i].querySelector("h5");
    const temperature=cards[i].querySelector(".temperature")
    const humidity=cards[i].querySelector(".humidity")
    const condition=cards[i].querySelector(".condition")

}
}