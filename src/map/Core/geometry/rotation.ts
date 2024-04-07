export function degToRad(angle) {
    return angle / 180 * Math.PI;
}

export function rotatePoints(points, angle, origin = [0, 0]) {
    return points.map(point => rotatePoint(point, angle, origin));
}

export function rotatePoint(point, angle, origin = [0, 0]) {
    const r = degToRad(angle);
    const adjustedPoint = point.map((c, i) => c - origin[i]);;
    const rotatedPoint = [
        adjustedPoint[0] * Math.cos(r) - adjustedPoint[1] * Math.sin(r),
        adjustedPoint[0] * Math.sin(r) + adjustedPoint[1] * Math.cos(r)
    ];
    return rotatedPoint.map((c, i) => c + origin[i])
}

export function rotatePolygonPoints(points, angle, origin) {
    let p = [];
    for (let i = 0, l = points.length; i < l; i++) {
        p[i] = rotatePoint(points[i], angle, origin);
    }
    return p;
}

export function rotatePolygon(polygon, angle, origin = [0, 0]) {
    const points = polygon.array()
    polygon.plot(rotatePolygonPoints(points, angle, origin))
}