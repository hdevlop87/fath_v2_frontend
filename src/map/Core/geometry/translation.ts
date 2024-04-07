export function pointTranslate(point, [tx, ty]) {
    let newX = point[0] + tx;
    let newY = point[1] + ty;
    return [newX, newY];
}

// Function to translate an array of points
export function pointsTranslate(points, [tx, ty]) {
    let translatedPoints = [];
    for (let i = 0; i < points.length; i++) {
        let translatedPoint = pointTranslate(points[i], [tx, ty]);
        translatedPoints.push(translatedPoint);
    }
    return translatedPoints;
}

// Function to translate a polygon
export function translatePolygon(polygon, [tx, ty]) {
    let points = polygon.array();
    let translatedPoints = pointsTranslate(points, [tx, ty]);
    polygon.plot(translatedPoints);
}

export function calculateCentroid(points) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < points.length; i++) {
        let point = points[i];
        minX = Math.min(minX, point[0]);
        minY = Math.min(minY, point[1]);
        maxX = Math.max(maxX, point[0]);
        maxY = Math.max(maxY, point[1]);
    }

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    return [centerX, centerY];
}

// Function to move a polygon to the center
export function centerPolygon(polygon, center) {
    let points = polygon.array();
    let centroid = calculateCentroid(points);
    let tx = center[0] - centroid[0];
    let ty = center[1] - centroid[1];
    let translatedPoints = pointsTranslate(points, [tx, ty]);
    polygon.plot(translatedPoints);
}