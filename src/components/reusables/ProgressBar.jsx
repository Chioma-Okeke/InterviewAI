import React from 'react'
import PropTypes from 'prop-types'

function ProgressBar({progress}) {
  return (
    <div className='max-w-[117.8px] w-full bg-gray-200 rounded-full h-[4.91px] dark:bg-primary-light mt-1'>
        <div
            className='bg-brand-color h-[4.91px] rounded-full'
            style={{width: `${progress}%`}}
        ></div>
    </div>
  )
}

ProgressBar.prototype = {
  progress: PropTypes.string
}

export default ProgressBar