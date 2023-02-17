using System.Collections;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Threading;
using UnityEngine;

public class FollowCam : MonoBehaviour
{

    private Transform camTargetTr;
    private Vector2Int minRange;
    private Vector2Int maxRange;

    [Range(0.0f, 2.0f)]
    public float distX = 1.0f;
    [Range(0.0f, 2.0f)]
    public float distY = 1.0f;

    [Range(1.0f, 10.0f)]
    public float smoothX = 5.0f;

    [Range(1.0f, 10.0f)]
    public float smoothY = 5.0f;

    private TrackingZone trackingZone;





    // Start is called before the first frame update
    private void Awake()
    {
        camTargetTr = GameObject.FindWithTag("CameraTarget").transform;
        trackingZone = GameObject.Find("Gizmo_TrackingZone").GetComponent<TrackingZone>();
        minRange = trackingZone.minXAndY;
        maxRange = trackingZone.maxXAndY;

    }


    bool CheckDistanceX()
    {
        return Mathf.Abs(transform.position.x - camTargetTr.position.x) > distX;
    }

    bool CheckDistanceY()
    {
        return Mathf.Abs(transform.position.y - camTargetTr.position.y) > distY;
    }


    void CameraTracking()
    {
        float camPosX = transform.position.x;
        float camPosY = transform.position.y; //ī�޶� ������

        if (CheckDistanceX())
        {
            camPosX = Mathf.Lerp(transform.position.x, camTargetTr.position.x, smoothX * Time.deltaTime); //Ÿ�� x�� ����
        }

        if (CheckDistanceY())
        {
            camPosY = Mathf.Lerp(transform.position.y, camTargetTr.position.y, smoothY * Time.deltaTime); //Ÿ�� y�� ����
        }

        camPosX = Mathf.Clamp(camPosX, minRange.x, maxRange.x); //���� �������� ���� ����

        camPosY = Mathf.Clamp(camPosY, minRange.y, maxRange.y);

        transform.position = new Vector3(camPosX, camPosY, transform.position.z); //ī�޶� ������ ����

    }


    // Update is called once per frame
    void FixedUpdate()
    {
        CameraTracking();
    }
}
