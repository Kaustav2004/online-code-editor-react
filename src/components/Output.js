import React from 'react'

const Output = ({formData}) => {
    const srcDoc =
    ` <html>
        <body>${formData.HTML}</body>
        <style>${formData.CSS}</style>
        <script>${formData.JS}</script>
      </html>`

  return (
    <div> 
        <iframe className='bg-white min-w-full w-fit min-h-screen max-h-fit text-black transition-all delay-1000 duration-1000'
        srcDoc={srcDoc} title='output'>
      </iframe>
    </div>
  )
}

export default Output
