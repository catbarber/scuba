import React from 'react'

const LoadingSpinner = ({ size = 40, color = 'var(--caribbean-blue)' }) => {
    return (
        <div style={{
            width: size,
            height: size,
            border: `4px solid ${color}20`,
            borderTop: `4px solid ${color}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
        }} />
    )
}

export default LoadingSpinner