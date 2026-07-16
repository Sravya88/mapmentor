export default function sitemap() {
  const areas = ['Gachibowli','Hitech City','Madhapur','Kondapur','Kukatpally']
  const subjects = ['CBSE-Math','JEE-Math','NEET-Biology','Coding','Physics']
  
  const urls = [
    { url: 'https://mapmentor.vercel.app', lastModified: new Date() },
    ...areas.flatMap(area => 
      subjects.map(sub => ({
        url: `https://mapmentor.vercel.app/search?area=${area}&subject=${sub}`,
        lastModified: new Date()
      }))
    )
  ]
  return urls
}